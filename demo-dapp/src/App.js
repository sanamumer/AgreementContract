import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./App.css";

function App(){
  return (
    <div className='App-header'>
    <Form>
    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Contract ID</Form.Label>
        <Form.Control type="number" placeholder="Enter Id" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Terms</Form.Label>
        <Form.Control type="text" placeholder="Enter terms" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Date</Form.Label>
        <Form.Control type="date" placeholder="Enter Date" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="I Agree" />
      </Form.Group>
      <Button className='Button' type="submit">
        Submit
      </Button>
    </Form>
    </div>
  );
}

export default App;