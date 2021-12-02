const t = require('tap')
const mockGlobals = require('../../fixtures/mock-globals')
const { delimiter } = require('path')

const mockPath = () => t.mock('../../../lib/utils/path.js')

mockGlobals(t, { 'process.env': {} }, { replace: true })
t.strictSame(process.env, {})

t.test('uppercase', async t => {
  const parts = ['foo', 'bar', 'baz']
  mockGlobals(t, { 'process.env.PATH': parts.join(delimiter) })
  t.match(mockPath(), {
    PATH: parts,
    key: 'PATH',
    value: parts.join(delimiter),
  })
})

t.test('mixed case', async t => {
  const parts = ['a', 'b', 'c']
  mockGlobals(t, { 'process.env.Path': parts.join(delimiter) })
  t.match(mockPath(), {
    PATH: parts,
    key: 'Path',
    value: parts.join(delimiter),
  })
})

t.test('lowercase', async t => {
  const parts = ['x', 'y', 'z']
  mockGlobals(t, { 'process.env.path': parts.join(delimiter) })
  t.match(mockPath(), {
    PATH: parts,
    key: 'path',
    value: parts.join(delimiter),
  })
})
