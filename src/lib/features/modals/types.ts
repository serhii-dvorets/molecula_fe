export type ModalData =
| { type: 'tariffUpdateModal', id?: string, name: string, unitOfMeasurement: string, pricePerUnit: string}
| { type: 'tariffDeleteModal', id: string };


export type ModalName = 
| 'tariffUpdateModal'
| 'tariffDeleteModal';