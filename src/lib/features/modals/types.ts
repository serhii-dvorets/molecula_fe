export type ModalData =
| { type: 'tariffUpdateModal', id?: string, name: string, unitOfMeasurement: string, pricePerUnit: string}
| { type: 'tariffDeleteModal', id: string }
| UserUpdateModalType
| { type: 'userDeleteModal', id: string };


export type ModalName = 
| 'tariffUpdateModal'
| 'tariffDeleteModal'
| 'userUpdateModal'
| 'userDeleteModal';

export type UserCreateModalType = {
    type: 'userUpdateModal',
    name: string,
    phoneNumber: string,
    notes?: string,
    role: string
} & UserAdress

export type UserUpdateModalType = {
    type: 'userUpdateModal',
    id: string,
    name?: string,
    phoneNumber?: string,
    notes?: string,
    role?: string
} & UserAdress

export type UserAdress = {
    city?: string,
    street?: string, 
    building?: string, 
    flat?: string, 
    entrance?: string, 
    addressNotes?: string, 
}