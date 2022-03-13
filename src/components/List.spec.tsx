import { findByText, render, waitForElementToBeRemoved, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import List from './List';

// descrever qual componente estou testando;
// it === test. it é mais semantico

// get* functions will return the element or throw an error if it cannot be found
// query* functions will return the element or null if it cannot be found
// find: Espera o elemento aparecer em tela;
describe('List Component', () => {
  it('should render list items', () => {
    const { getByText, rerender, queryByText } = render(<List initialItems={['Pietro', 'Rodz', 'Mayk']} />);

    expect(getByText('Pietro')).toBeInTheDocument();
    expect(getByText('Rodz')).toBeInTheDocument();
    expect(getByText('Mayk')).toBeInTheDocument();

    // rerender pertmite uma nova renderização do elemento, para testar se a validção não vem de um valor estático.
    // o screen é utilizado para um contexto global da aplicação, e não com escopo.
    rerender(<List initialItems={['Julia']} />)

    expect(screen.getByText('Julia')).toBeInTheDocument();
    expect(screen.getByText('Mayk')).not.toBeInTheDocument();
  });

  // userEvent permite disparar ação dentro da interface da aplicação 
  it('should be able to add new item to the list', async () => {
    const { getByText, getByPlaceholderText, debug, findByText } = render(<List initialItems={[]} />);

    const inputElement = getByPlaceholderText('Novo item...')
    const addButton = getByText('Adicionar');

    userEvent.type(inputElement, 'Novo');
    debug();
    userEvent.click(addButton);
    debug();

    // Pode ser feito com waitFor.
    expect(await findByText('Novo')).toBeInTheDocument();
  });

  it('should be able to remove item from the list', async () => {
    const { getByText, getAllByText } = render(<List initialItems={['Pietro']} />);

    const removeButton = getAllByText('Remover');

    userEvent.click(removeButton[0]);

    await waitForElementToBeRemoved(() => {
      return getByText('Pietro');
      // expect(queryBytext('novo').not.toBeInTheDocument()
    })
  });
}); 