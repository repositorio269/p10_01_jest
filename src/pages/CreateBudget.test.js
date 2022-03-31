import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateBudget from "./CreateBudget";

describe('Formulario crear cliente', () => { // Describe el suite test

    test('Valida el campo CIF', () => { // Decribe el case test
        // render(<CreateBudget />); // si recibiera props se las pasaremos de datos mock
        // En el caso de necesitar ver el componente renderizado una fórmula
        // es pasarlo a una constante y invocar su metodo debug
        const component = render(<CreateBudget />);
        // component.debug();
        // let validationMessage;
        // let textInput;
        const validationMessage = component.findByTestId('test-cif-message');
        const textInput = component.findByTestId('test-cif-input');
        userEvent.type(textInput, 'Z');
        expect(validationMessage).toHaveTextContent('El CIF debe comenzar por letra válida y tener 9 caracteres');
    })

})