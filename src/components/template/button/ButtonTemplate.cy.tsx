import ButtonTemplate from './ButtonTemplate';
/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

// Cypress Component Test
describe('<ButtonTemplate />', () => {
  it('should be visible', () => {
    cy.mount(<ButtonTemplate label="1234" />);
    cy.get('button').should('be.visible');
  });

  it('should be clickable', () => {
    const onClick = cy.stub();
    cy.mount(<ButtonTemplate label="1234" onClick={onClick} />);
    cy.get('button').click();
  });

  it('should display the correct label', () => {
    cy.mount(<ButtonTemplate label="1234" />);
    cy.contains('1234').should('exist');
  });

  it('should apply correct styles for primary button', () => {
    cy.mount(<ButtonTemplate label="Primary" primary />);
    cy.contains('Primary').should('have.class', 'bg-white text-black');
  });

  it('should apply correct styles for secondary button', () => {
    cy.mount(<ButtonTemplate label="Secondary" />);
    cy.contains('Secondary').should('have.class', 'bg-black text-white');
  });

  it('should apply additional styles passed through props', () => {
    const customStyle = 'bg-red-300';
    cy.mount(<ButtonTemplate label="Styled" style={customStyle} />);
    cy.contains('Styled').should('have.class', customStyle);
  });
});

export {};
