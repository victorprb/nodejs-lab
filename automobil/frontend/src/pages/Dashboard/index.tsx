import React, { useCallback, useEffect, useState } from 'react';
import { formatISO } from 'date-fns';
import { Chart } from "react-google-charts";
import { FiCheckSquare, FiEdit, FiSquare, FiTrash } from 'react-icons/fi'
import { Root, Trigger } from "@radix-ui/react-dialog";
import {
    ChartContainer,
    Container,
    Content,
    FilterNav,
    Header,
    HeaderContent,
    NewVehicleButton,
    Table,
} from './styles';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';
import { Vehicle } from './components/Vehicle';

export interface IVehicle {
    id: number;
    model: string;
    brand: string;
    year: number;
    description: string;
    sold: boolean;
    createdAt: Date;
}

export interface IChartData {
    vehiclesByBrand: [];
    vehiclesByDecade: [];
    soldVehicles: number;
}

const Dashboard: React.FC = () => {
    const [vehicles, setVehicles] = useState<IVehicle[]>([]);
    const [isFiltered, setFilter] = useState(false)
    const [chartData, setChartData] = useState({} as IChartData)

    const handleVehicleDelete = useCallback(async (vehicle: IVehicle) => {
        await api.delete(`/api/v1/vehicles/${vehicle.id}`)

        fetchVehicles("")
    }, [])

    const fetchVehicles = useCallback((query: string) => {
        let url = "/api/v1/vehicles"

        if (query !== "") {
            url = url + `?${query}`
        }

        api.get(url).then(response => {
            setVehicles(response.data);
        });
    }, [])

    const handleFilter = useCallback(() => {
        const date = new Date()
        date.setDate(-7)

        fetchVehicles(`fromDate=${formatISO(date)}`)
        setFilter(true)
    }, [])

    useEffect(() => {
        api.get("/api/v1/vehicles").then(response => {
            setVehicles(response.data);
        });
    }, []);

    useEffect(() => {
        api.get("/api/v1/vehicles/dashboard").then(response => {
            setChartData(response.data)
        })
    }, [vehicles])

    return (
        <Container>
            <Header>
                <HeaderContent>
                    <h1>Automobil</h1>
                </HeaderContent>
            </Header>

            <Content>
                <ChartContainer>
                    <div style={{
                        width: "60%",
                        height: 400,
                        background: "#fff",
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                        flexDirection: "column"
                    }}>
                        <h1>Veículos vendidos</h1>
                        <strong style={{ fontSize: 100 }}>{chartData.soldVehicles}</strong>
                    </div>

                    <Chart
                        chartType="PieChart"
                        data={chartData.vehiclesByBrand && [["Marca", "Total de veículos"], ...chartData.vehiclesByBrand]}
                        options={{
                            title: "Veículos por Fabricante",
                        }}
                        width={"100%"}
                        height={"400px"}
                    />

                    <Chart
                        chartType="Bar"
                        data={chartData.vehiclesByDecade && [["Década", "Total de veículos"], ...chartData.vehiclesByDecade]}
                        options={{
                            title: "Veículos por Decada de Fabricação",
                        }}
                        width={"100%"}
                        height={"400px"}
                    />
                </ChartContainer>

                <Root>
                    <Trigger asChild>
                        <NewVehicleButton>Cadastrar</NewVehicleButton>
                    </Trigger>

                    <Vehicle fetchVehicles={fetchVehicles} />
                </Root>

                {vehicles.length === 0 && (
                    <p>Nenhum veículo cadastrado</p>
                )}

                <FilterNav>
                    <button onClick={() => {
                        setFilter(false)
                        fetchVehicles("")
                    }}>
                        {isFiltered ? <FiSquare /> : <FiCheckSquare />}
                        Todos
                    </button>
                    <button onClick={handleFilter}>
                        {isFiltered ? <FiCheckSquare /> : <FiSquare />}
                        Última semana
                    </button>
                </FilterNav>

                <Table>
                    <tbody>
                        <tr>
                            <td></td>
                            <td><strong>Modelo</strong></td>
                            <td><strong>Fabricante</strong></td>
                            <td><strong>Ano</strong></td>
                            <td><strong>Status</strong></td>
                            <td><strong>Descrição</strong></td>
                        </tr>
                        {vehicles.map((vehicle) => {
                            return (
                                <tr key={vehicle.id}>
                                    <td>
                                        <div>
                                            <Root>
                                                <Trigger asChild>
                                                    <button><FiEdit /></button>
                                                </Trigger>

                                                <Vehicle vehicle={vehicle} fetchVehicles={fetchVehicles} />
                                            </Root>
                                            <button onClick={() => handleVehicleDelete(vehicle)}><FiTrash /></button>
                                        </div>
                                    </td>
                                    <td>{vehicle.model}</td>
                                    <td>{vehicle.brand}</td>
                                    <td>{vehicle.year}</td>
                                    <td>{vehicle.sold ? "vendido" : "disponível"}</td>
                                    <td>{vehicle.description}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Content>
        </Container >
    );
};

export default Dashboard;