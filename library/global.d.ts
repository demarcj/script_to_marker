// app.d.ts

interface App {
  // --- Core ---
  version: string;
  buildName: string;
  project: Project | null;

  // --- Undo ---
  beginUndoGroup(name: string): void;
  endUndoGroup(): void;

  // --- Execution ---
  executeCommand(id: number): void;

  // --- UI / Alerts ---
  alert(message: string): void;
  beep(): void;

  // --- Preferences ---
  preferences: Preferences;

  // --- Scheduling ---
  scheduleTask(
    script: string,
    delay: number,
    repeat?: boolean
  ): number;

  cancelTask(taskID: number): void;

  // --- Memory / GC ---
  purge(target: PurgeTarget): void;
}

interface Project {
  activeItem: CompItem | null;
  items: ItemCollection;
  file: File | null;

  save(file?: File): void;
  close(saveChanges?: boolean): void;
}

interface CompItem {
  name: string;
  width: number;
  height: number;
  pixelAspect: number;
  frameRate: number;
  duration: number;
  workAreaDuration: number;
  workAreaStart: number;

  selectedLayers: Layer[];
  layers: LayerCollection;

  time: number;

  /** 1-based index */
  layer(index: number): Layer;
  /** Finds the first layer with this name (topmost match). Returns null if not found. */
  layer(name: string): Layer | null;
}


interface Preferences {
  getPrefAsString(section: string, key: string): string;
  getPrefAsLong(section: string, key: string): number;
  getPrefAsBool(section: string, key: string): boolean;

  savePrefAsString(section: string, key: string, value: string): void;
  savePrefAsLong(section: string, key: string, value: number): void;
  savePrefAsBool(section: string, key: string, value: boolean): void;
}

interface ItemCollection {
  length: number;

  // 1-based index access
  [index: number]: Item;

  addComp(
    name: string,
    width: number,
    height: number,
    pixelAspect: number,
    duration: number,
    frameRate: number
  ): CompItem;

  addFolder(name: string): FolderItem;

  remove(): void;
}

interface Item {
  name: string;
  id: number;
  parentFolder: FolderItem | null;

  remove(): void;
}

interface LayerCollection {
  length: number;

  // 1-based indexing
  [index: number]: Layer;

  add(
    item: AVItem,
    duration?: number
  ): Layer;

  addText(text?: string): TextLayer;
  addShape(): ShapeLayer;
  addSolid(
    color: [number, number, number],
    name: string,
    width: number,
    height: number,
    pixelAspect: number,
    duration: number
  ): AVLayer;

  removeAll(): void;
}

interface Layer {
  index: number;
  name: string;
  enabled: boolean;
  shy: boolean;
  locked: boolean;
  selected: boolean;
  solo: boolean;

  parent: Layer | null;
  hasParent: boolean;

  inPoint: number;
  outPoint: number;
  startTime: number;
  stretch: number;

  label: number;
  comment: string;

  containingComp: CompItem;

  // 2D / 3D
  threeDLayer: boolean;

  // Core methods
  duplicate(): Layer;
  remove(): void;
  moveBefore(layer: Layer): void;
  moveAfter(layer: Layer): void;
  moveToBeginning(): void;
  moveToEnd(): void;

  // Properties
  property(nameOrIndex: string | number): Property | PropertyGroup;
}

interface AVLayer extends Layer {
  source: AVItem | null;
  audioEnabled: boolean;
  motionBlur: boolean;
  collapseTransformation: boolean;
  property(name: "ADBE Time Remapping"): TimeRemapProperty;
  timeRemapEnabled: boolean;
}

interface TextLayer extends AVLayer {
  property(name: "Source Text"): Property;
}

interface ShapeLayer extends AVLayer {}

interface Property {
  value: any;
  numKeys: number;

  setValue(value: any): void;
  setValueAtTime(time: number, value: any): void;

  keyTime(index: number): number;
  keyValue(index: number): any;
  removeKey(index: number): void;

  isTimeVarying: boolean;
}


declare var PurgeTarget: {
  ALL_CACHES: number;
  UNDO_CACHES: number;
  IMAGE_CACHES: number;
  SNAPSHOT_CACHES: number;
};

type PurgeTarget = number;

interface AVItem extends Item {
  width: number;
  height: number;
  pixelAspect: number;
  duration: number;
  frameRate: number;

  hasVideo: boolean;
  hasAudio: boolean;

  label: number;

  // Proxy / time
  time: number;
}

interface FolderItem extends Item {
  items: ItemCollection;
}

interface PropertyGroup {
  name: string;
  matchName: string;

  parentProperty: PropertyGroup | null;

  numProperties: number;

  property(indexOrName: number | string): Property | PropertyGroup;

  // Common AE checks
  canAddProperty?: boolean;
}

interface TimeRemapProperty extends Property {
  // Base Property info
  name: string;
  matchName: "ADBE Time Remapping";
  parentProperty: PropertyGroup | null;

  // Value
  value: number;

  // Keyframe data
  numKeys: number;
  isTimeVarying: boolean;

  // Value access
  setValue(value: number): void;
  setValueAtTime(time: number, value: number): void;
  valueAtTime(time: number, preExpression?: boolean): number;

  // Keyframe inspection
  keyTime(index: number): number;
  keyValue(index: number): number;
  nearestKeyIndex(time: number): number;

  // Interpolation
  setInterpolationTypeAtKey(
    index: number,
    inType: KeyframeInterpolationType,
    outType: KeyframeInterpolationType
  ): void;

  // Optional (exists but rarely needed)
  expression?: string;
  canSetExpression?: boolean;
}

declare var KeyframeInterpolationType: {
  LINEAR: number;
  BEZIER: number;
  HOLD: number;
}

declare var ParagraphJustification: {
  LEFT_JUSTIFY: number;
  CENTER_JUSTIFY: number;
  RIGHT_JUSTIFY: number;
};

// Make the global `app` typed
declare var app: App;

interface JSON {
  stringify(value: any): string;
}

declare var JSON: JSON;

declare var alert: (message: any) => void;

declare var confirm: (message: any) => boolean;

declare var prompt: (
  message?: any,
  defaultValue?: string
) => string | null;