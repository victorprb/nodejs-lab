import styled from 'styled-components';

export const Container = styled.div``;

export const Header = styled.header`
  padding: 32px 0;
  background: #28262e;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  color: #fff;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
`;


export const ChartContainer = styled.div`
  max-width: 1120px;
  margin: 10px;
  display: flex;
  align-items: center;
`;

export const NewVehicleButton = styled.button`
  height: 50px;
  border: 0;
  background-color: #28262e;
  color: #fff;
  font-weight: bold;
  padding: 0 1.25rem;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 30px;
  margin-bottom: 1rem;

  &:hover {
    background: ${(props) => props.theme["base-hover"]};
    transition: background-color 0.2s;
  }
`;

export const FilterNav = styled.div`
  display: flex;
  align-items: center;
  align-content: center;

  button {
    margin-right: 10px;
    align-items: center;
    justify-content: center;
    padding: 5px;

    svg {
      margin-right: 4px;
    }
  }
`

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  margin-top: 20px;
  margin-bottom: 50px;

  background: #fff;
  color: black;

  border-radius: 10px;

  td {
    padding: 10px;

    div {
      display: flex;
      flex-direction: column;
    }

    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }

    button {
      background: transparent;
      border: 0;
    }
  }
`;