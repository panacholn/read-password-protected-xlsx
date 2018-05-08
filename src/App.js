import React from 'react'
import * as XlsxPopulate from 'xlsx-populate/browser/xlsx-populate'

class SimpleReactFileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      data: [],
      password: '',
    }
  }

  onFormSubmit = (e) => {
    e.preventDefault()
    console.log(this.state)
    XlsxPopulate.fromDataAsync(this.state.file, { password: this.state.password })
      .then(workbook => {
        const data = workbook.sheet(0).usedRange().value()
        this.setState({ data })
      })
      .catch(err => alert('file or password wrong'))
  }

  onChange = (e) => {
    this.setState({ file: e.target.files[0]})
  }

  onTextChange = (e) => {
    this.setState({ password: e.target.value })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <h1>File Upload</h1>
          <input type="file" onChange={this.onChange} />
          <input type="text" onChange={this.onTextChange} />
          <button type="submit">Upload</button>
        </form>
        <div>
          <table>
            <tbody>
            {
              this.state.data.map(i => (
                <tr>
                  {
                    i.map(j => (<td style={{ border: '1px solid #e4e4e4'}}>{j}</td>))
                  }
                </tr>
              ))
            }
            </tbody>            
          </table>
        </div>
      </div>
    )
  }
}

export default SimpleReactFileUpload