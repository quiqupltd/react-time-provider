const Enzyme = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')

process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';
Enzyme.configure({ adapter: new Adapter() })
