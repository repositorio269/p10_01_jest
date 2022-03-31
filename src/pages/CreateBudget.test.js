import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateBudget from "./CreateBudget";

describe('Formulario crear cliente',  () => { // Describe el suite test
    // Usar async await para gestionar la asincronía de la carga de cada hook
    // All credits to Raul
    test('Valida el campo CIF', async () => { // Decribe el case test
        render(<CreateBudget />); // si recibiera props se las pasaremos de datos mock
        // En el caso de necesitar ver el componente renderizado una fórmula
        // es pasarlo a una constante y invocar su metodo debug
        // const component = render(<CreateBudget />);
        // component.debug();
        let validationMessage;
        let textInput;
        await screen.findByTestId('test-cif-message').then(data => validationMessage = data);
        await screen.findByTestId('test-cif-input').then(data => textInput = data);
        userEvent.type(textInput, 'Z');
        expect(validationMessage).toHaveTextContent('El CIF debe comenzar por letra válida y tener 9 caracteres');
    })

})