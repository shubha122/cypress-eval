const searchbar = '#searchBox'
const mainHeader = '.main-header'
const pageSource = '.action-buttons'
const backButton = '#addNewRecordButton'
const loginButton = '#login'
const newUserButton = '#newUser'

describe("Verify user can able to search Noiseless Headphones and apply a discount filter", () => {
    beforeEach(() => {
      cy.fixture("/user_input").as("inputs");
    });
    it("should be visit the url", function() {
        cy.visit(this.inputs.url); 
    })
    it("main header", function() {
        cy.get(mainHeader).contains(this.inputs.mainHeader)
    })
    it("Enter the Search keyword and click search button", function() {
        cy.get(searchbar) .invoke('attr','placeholder')
        .should('contain',this.inputs.searchBarPlaceholder)
        cy.get(searchbar).click().type(this.inputs.searchKeyword).should('have.value',this.inputs.searchKeyword)
        cy.get(pageSource).contains(this.inputs.titleName).click({force: true})
        cy.url().should('include', this.inputs.bookUrl)
        cy.get('div').contains(this.inputs.titleName)
         cy.get(backButton).click()
    })
    it("book count", function() {
        cy.get('.rt-table').within(() =>{
            cy.get('[role=rowgroup].rt-tr-group').should('have.length',10)
        })  
    })
    it("validate on pager", function() {
         cy.get('select').select('5 rows').should('have.value','5')
         cy.get('.-totalPages').contains('2')
         cy.get('button').contains('Previous').should('be.disabled')
         cy.get('button').contains('Next').click()
         cy.get('button').contains('Next').should('be.disabled')
         cy.get('button').contains('Previous').click()
    })
    it("should return author name by passing book name", function() {
        cy.get('div.rt-table>div.rt-tbody>div>div>div:nth-child(2)').each(($el,index,$list) =>{
            var text = $el.text()
            if(text.includes('this.inputs.titleName')){
                cy.get('div.rt-table>div.rt-tbody>div>div>div:nth-child(3)').eq(index).then(function(author){
                var authorName = author.text()
                expect(authorName).to.equal('this.inputs.authorName')             
                })
            }         
        })
    }) 
    it("login button validation", () =>{
           cy.get(loginButton).click()
           cy.url().should('include', 'https://demoqa.com/login')
           cy.go('back')
    })

})
