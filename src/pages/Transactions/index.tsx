import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { TransactionContainer, TransactionTable } from "./styles";

export function Transactions() {
  return (
    <div>
      <Header />
      <Summary />
      <TransactionContainer>
        <TransactionTable>
          <tbody>
            <tr>
              <td width="50%">Desenvolvimento de site</td>
              <td>R$ 2.000,00</td>
              <td>Venda</td>
              <td>10/08/2022</td>
            </tr>
            <tr>
              <td width="50%">Compra de comida</td>
              <td> - R$ 59,00</td>
              <td>Venda</td>
              <td>10/08/2022</td>
            </tr>
          </tbody>
        </TransactionTable>
      </TransactionContainer>
    </div>
  );
}
