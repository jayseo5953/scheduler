describe("Appointment tests" , ()=>{

  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
  
    cy.visit("/");
  
    cy.contains("Monday");
   });

  it("should book an interview", () => {
    
    cy.get('[alt=Add]')
      .first()
      .click()
    
    cy.get("[placeholder='Enter Student Name']")
      .type('Jay')

    cy.get('.interviewers__item-image')
      .first()
      .click()

    cy.contains("Save")
      .click()

    cy.contains(".appointment__card--show", "Jay");
    cy.contains(".appointment__card--show", "Sylvia Palmer");

  })

  it("should edit an interview", () => {
    
    cy.contains("main","Archie Cohen")
      .get('[alt=Edit]')
      .first()
      .click({ force: true })
      
    cy.get("[value='Archie Cohen']")
      .clear()
      .type('Jay Seo')

    cy.get("[alt='Tori Malcolm']")
      .click()
    
    cy.contains("Save")
      .click()

    cy.contains(".appointment__card--show", "Jay");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  })

  it("should cancel an interview", () => {
    
    cy.contains("main","Archie Cohen")
      .get('[alt=Delete]')
      .first()
      .click({ force: true })
    
    cy.contains("Confirm")
      .click()

    cy.contains('DELETING').should('exist');
    cy.contains('DELETING').should('not.exist');


    cy.contains('.appointment__card', "Archie Cohen")
      .should('not.exist')

   
      
  })


});