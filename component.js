var reactDocs = require('react-docgen')
var fs = require('fs')
var path = require('path')

exports.handlers = {
  newDoclet: function({ doclet }) {
    var filePath = path.join(doclet.meta.path, doclet.meta.filename)
    const componentTag = (doclet.tags || []).find(tag => tag.title === 'component')
    if (componentTag) {
      doclet.component = parseReact(filePath, doclet)
      doclet.component.type = 'react'
      doclet.kind = 'class'
    } else {
      if (path.extname(filePath) === '.jsx') {
        if (doclet.kind !== 'function' && doclet.kind !== 'event') {
          doclet.undocumented = true
        }
      }
    }
  }
}

var parseReact = function (filePath, doclet) {
  if (path.extname(filePath) === '.tsx') {
    return {
      props: [],
      displayName: doclet.name,
      filePath: filePath,
    }
  }
  var src = fs.readFileSync(filePath, 'UTF-8')
  var docGen
  try {
    docGen = reactDocs.parse(src)
  } catch (error) {
    if (error.message === 'No suitable component definition found.') {
      return {
        props: [],
        filePath: filePath,
        displayName: doclet.name,
      }
    } else {
      throw error
    }
  }
  
  return {
    props: Object.entries(docGen.props || {}).map(([key, prop]) => ({
      name: key,
      description: prop.description,
      type: prop.type ? prop.type.name : prop.flowType.name,
      required: typeof prop.required === 'boolean' && prop.required,
      defaultValue: prop.defaultValue
        ? (prop.defaultValue.computed ? 'function()' : prop.defaultValue.value)
        : undefined
    })),
    displayName: docGen.displayName,
    filePath: filePath,
  }
}

exports.parseReact = parseReact
