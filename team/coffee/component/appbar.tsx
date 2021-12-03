import Link from "next/link";

import { Navbar, Container, Nav } from "react-bootstrap";

const AppBar = () => {
  return (
    <Navbar bg="primary" expand="lg">
      <Container className="w-100">
        <Navbar.Brand className="ms-3">
          <Link href="/">
            <a className="text-light">MYWORKSPACE</a>
          </Link>
        </Navbar.Brand>
        <div className="d-flex justify-content-end me-3">
          <Nav className="me-auto">
            <Nav.Item className="me-3">
              {}
              {}
              <Link href="/">
                <a className="text-light">HOME</a>
              </Link>
            </Nav.Item>
            <Nav.Item className="me-3">
              <Link href="/about">
                <a className="text-light">Notice(Lazy Load, CSR)</a>
              </Link>
            </Nav.Item>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};

export default AppBar;
