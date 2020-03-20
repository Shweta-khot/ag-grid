import { DraggingEvent, DragSourceType, DropTarget } from "../dragAndDrop/dragAndDropService";
import { GridPanel } from "./gridPanel";
import { RowNode } from "../entities/rowNode";
export declare class RowDragFeature implements DropTarget {
    private dragAndDropService;
    private rowModel;
    private focusController;
    private gridOptionsWrapper;
    private selectionController;
    private rangeController;
    private mouseEventService;
    private eventService;
    private gridPanel;
    private clientSideRowModel;
    private eContainer;
    private needToMoveUp;
    private needToMoveDown;
    private movingIntervalId;
    private intervalCount;
    private lastDraggingEvent;
    private isMultiRowDrag;
    private movingNodes;
    constructor(eContainer: HTMLElement, gridPanel: GridPanel);
    private postConstruct;
    getContainer(): HTMLElement;
    isInterestedIn(type: DragSourceType): boolean;
    getIconName(): string;
    getRowNodes(dragginEvent: DraggingEvent): RowNode[];
    onDragEnter(draggingEvent: DraggingEvent): void;
    onDragging(draggingEvent: DraggingEvent): void;
    private onEnterOrDragging;
    private doManagedDrag;
    private getRowIndexNumber;
    private moveRowAndClearHighlight;
    private clearRowHighlight;
    private moveRows;
    private checkCenterForScrolling;
    private ensureIntervalStarted;
    private ensureIntervalCleared;
    private moveInterval;
    dispatchEvent(type: string, draggingEvent: DraggingEvent): void;
    onDragLeave(draggingEvent: DraggingEvent): void;
    onDragStop(draggingEvent: DraggingEvent): void;
    private stopDragging;
}
