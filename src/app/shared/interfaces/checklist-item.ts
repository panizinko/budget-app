export interface ChecklistItem {
  id: string;
  checklistId: ChecklistItem['id'];
  title: string;
  checked: boolean;
}

export type AddChecklistItem = {
  item: Omit<ChecklistItem, 'id' | 'checklistId' | 'checked'>;
  checklistId: ChecklistItem['id'];
};

export type EditChecklistItem = {
  id: ChecklistItem['id'];
  data: AddChecklistItem['item'];
};

export type RemoveChecklistItem = ChecklistItem['id'];
