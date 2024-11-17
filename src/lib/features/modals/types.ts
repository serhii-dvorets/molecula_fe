export type ModalData =
| { type: 'stationUpdateModal', id?: string, name: string, location: string}
| { type: 'stationDeleteModal', id: string };


export type ModalName = 
|'stationUpdateModal'
| 'stationDeleteModal';