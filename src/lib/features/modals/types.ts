export type ModalData =
| { type: 'tariffUpdateModal', id?: string, name: string, unitOfMeasurement: string, pricePerUnit: string}
| { type: 'tariffDeleteModal', id: string }
| { type: 'userDeleteModal', id: string }
| UserUpdateModalType
| OrderCreateModalType
| OrderUpdateModalType

export type ModalName = 
| 'tariffUpdateModal'
| 'tariffDeleteModal'
| 'userUpdateModal'
| 'userDeleteModal'
| 'orderCreateModal'
| 'orderUpdateModal';

export type OrderCreateModalType = {
    id?: string;
    type: 'orderCreateModal',
    customer: string
}

export type OrderUpdateModalType = {
    id: string;
    type: 'orderUpdateModal',
    customer: string
}

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