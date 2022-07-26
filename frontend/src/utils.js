import {Toast,ToastContainer} from 'react-bootstrap'

export const sortUp = (a,b,element)=>{
    if(a[element] < b[element]){return 1;}
    if(a[element] > b[element]) { return -1; }
    return 0;
}

export const sortDown = (a,b,element)=>{
    if(a[element] < b[element]){return -1;}
    if(a[element] > b[element]) { return 1; }
    return 0;
}

export const ToastAlert = ({setShow,show,header,alert}) =>{
    return(
        <ToastContainer id={'alert-container'}>
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide >
          <Toast.Header id={'alert-header'} closeButton>
            <strong className="me-auto">{header}</strong>
            <small className="text-muted">just now</small>
          </Toast.Header>
          <Toast.Body id={'alert-body'}>{alert}</Toast.Body>
        </Toast>
      </ToastContainer>
    )
}