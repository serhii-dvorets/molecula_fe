export type CreateTariffBody = {
    name: string;
    unitOfMeasurement: string;
    pricePerUnit: string;
}

export type UpdateTariffBody = {
    id: string;
    name?: string;
    unitOfMeasurement?: string;
    pricePerUnit?: string;
}

export type Tariff = {
    id: string;
    name: string;
    unitOfMeasurement: string;
    pricePerUnit: string;
}