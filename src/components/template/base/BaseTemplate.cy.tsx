import BaseTemplate from './BaseTemplate';

describe('<BaseTemplate /> tests', () => {
  it('should render and display the sample text prop', () => {
    const sampleText = 'Hello World';
    cy.mount(<BaseTemplate sampleTextProp={sampleText} />);
    cy.get('div').contains(sampleText).should('be.visible');
  });

  it('should have the correct background gradient', () => {
    const sampleText = 'Testing Style';
    cy.mount(<BaseTemplate sampleTextProp={sampleText} />);
    cy.get('div').should(
      'have.class',
      'bg-gradient-to-t from-cyan-500 to-blue-500'
    );
  });
});

export {};
