import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "phosphor-react";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { IVehicle } from "../..";
import api from "../../../../services/api";

import { CloseButton, Content, Overlay } from "./styles";

const required = "Campo obrigatório";

const newVehicleSchema = z.object({
    model: z.string().min(1, required),
    brand: z.string().min(1, required),
    year: z.string().min(1, required),
    sold: z.boolean(),
    description: z.string()
});

type CreateVehicle = z.infer<typeof newVehicleSchema>;

interface VehicleProps {
    vehicle?: IVehicle
    fetchVehicles: (query: string) => void
}
const brandOptions = ["chevrolet", "volkswagen", "ford"]

export function Vehicle({ vehicle, fetchVehicles }: VehicleProps) {
    const { register, reset, handleSubmit, formState: { errors } } = useForm<CreateVehicle>({
        resolver: zodResolver(newVehicleSchema),
        defaultValues: {
            model: vehicle?.model,
            brand: vehicle?.brand,
            year: vehicle?.year.toString(),
            sold: vehicle?.sold,
            description: vehicle?.description
        },
    });

    const onSubmit = async (data: any) => {
        if (vehicle) {
            await api.put(`api/v1/vehicles/${vehicle.id}`, data)
        } else {
            await api.post("api/v1/vehicles", data)

            reset();
        }

        fetchVehicles("")
    };

    return (
        <Dialog.Portal>
            <Overlay />

            <Content>
                <Dialog.Title>{vehicle ? "Editar Veículo" : "Novo Veículo"}</Dialog.Title>

                <CloseButton>
                    <X size={24} />
                </CloseButton>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" placeholder="Modelo" {...register("model", { required: true })} />
                    {errors.model && <span style={{ color: "red" }}>{errors.model.message}</span>}

                    <select {...register("brand", { required: true })}>
                        <option>Selecione...</option>
                        {brandOptions.map(brand => {
                            return <option value={brand}>{brand}</option>
                        })}
                    </select>
                    {errors.brand && <span style={{ color: "red" }}>{errors.brand.message}</span>}

                    <input type="text" placeholder="Ano" {...register("year", { required: true })} />
                    {errors.year && <span style={{ color: "red" }}>{errors.year.message}</span>}

                    <div>
                        <input type="checkbox" placeholder="Vendido" {...register("sold")} />
                        <span style={{ marginLeft: 10 }}>Vendido</span>
                        {errors.sold && <span style={{ color: "red" }}>{errors.sold.message}</span>}
                    </div>

                    <input type="text" placeholder="Descrição" {...register("description", { required: true })} />
                    {errors.description && <span style={{ color: "red" }}>{errors.description.message}</span>}

                    <button type="submit">Enviar</button>
                </form>
            </Content>
        </Dialog.Portal>
    );
}
