import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { v4 as uuidv4 } from "uuid";

export type BranchNodeProperty = { type: "branch"; children: TreeNode[] };
export type LeafNodeProperty = { type: "leaf" };
export type BasicNode = { id: number | string; name: string };
export type BranchNode = BasicNode & BranchNodeProperty;
export type LeafNode = BasicNode & LeafNodeProperty;
export type TreeNode = BranchNode | LeafNode;
export type InsertData = {
  newNodeId: TreeNode["id"];
  key: string;
  value?: any;
};

@Component({
  selector: "app-tree-viewer",
  templateUrl: "./tree-viewer.component.html",
  styleUrls: ["./tree-viewer.component.less"],
})
export class TreeViewerComponent implements OnInit {
  @Output()
  onDelete = new EventEmitter<TreeNode["id"]>();

  @Output()
  onInsert = new EventEmitter<InsertData>();

  _showModal = false;
  _highlight = false;

  modalTitle = "编辑";

  _form = new FormGroup({
    key: new FormControl(null, [Validators.required]),
    value: new FormControl(),
  });

  @Input()
  parent?: BranchNode;

  @Input()
  unitIndent = 10;

  @Input()
  path: TreeNode["id"][] = [];

  _expand = false;

  _onSave?: () => void;

  @Input()
  root: TreeNode = {
    id: -1,
    name: "(root)",
    type: "branch",
    children: [
      {
        id: 0,
        name: "bra1",
        type: "branch",
        children: [
          {
            id: 1,
            name: "c01",
            type: "leaf",
          },
          {
            id: 2,
            name: "c02",
            type: "leaf",
          },
        ],
      },
      {
        id: 3,
        name: "leaf",
        type: "leaf",
      },
      {
        id: 4,
        name: "leaf",
        type: "leaf",
      },
      {
        id: 5,
        name: "bra",
        type: "branch",
        children: [
          {
            id: 6,
            name: "c11",
            type: "leaf",
          },
        ],
      },
    ],
  };

  constructor() {}

  ngOnInit(): void {
    if (this.path.length === 0) {
      this._expand = true;
    }
  }

  goEdit(): void {
    if (this.path.length !== 0) {
      this._highlight = true;
      this._showModal = true;
      this._form.setValue({ key: this.root.name, value: null });

      this._onSave = () => {
        this.root.name = this._form.value.key;
      }
    }
  }

  save(): void {
    if (this._onSave) {
      this._onSave();
    }

    this._showModal = false;
    this._highlight = false;
  }

  cancel(): void {
    this._showModal = false;
    this._highlight = false;
  }

  appendChild(): void {
    this.modalTitle = '新增子节点';
    this._showModal = true;

    this._onSave = () => {
      this.root.type = "branch";
      const newNodeId = uuidv4();
      const key = this._form.value.key as string;
      const root = this.root as BranchNode;
      root.type = "branch";
      if (root.children === undefined) {
        root.children = [];
      }
      root.children.push({ id: newNodeId, name: key, type: "leaf" });
      this._expand = true;
    };
  }

  insertNext(): void {
    this._showModal = true;

    this._onSave = () => {
      if (this.parent) {
        const parent = this.parent;
        const newNode: TreeNode = {
          id: uuidv4(),
          name: this._form.value.key,
          type: 'leaf',
        };
        parent.children.push(newNode);
      }
    }
  }

  deleteThis(): void {
    if (this.parent) {
      const parent = this.parent;
      parent.children = parent.children.filter(child => child.id !== this.root.id);
    }
  }
}
