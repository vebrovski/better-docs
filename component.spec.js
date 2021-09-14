const path = require('path')
const { expect } = require('chai')

const { parseReact } = require('./component')

const REACT_PATH = path.join(__dirname, 'fixtures/component.jsx')

describe('@component', function () {
  describe('.parseReact', function () {
    beforeEach(function () {
      this.doclet = {}
      this.output = parseReact(REACT_PATH, this.doclet)
    })

    it('returns displayName', function () {
      expect(this.output.displayName).to.equal('Documented')
    })

    it('returns prop types', function () {
      expect(this.output.props).to.have.lengthOf(2)
      expect(this.output.props[0]).to.deep.equal({
        description: 'Text is a text',
        name: 'text',
        required: false,
        type: 'string',
        defaultValue: '\'Hello World\''
      })
    })
  })
})
