import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import {EmailShareButton,FacebookShareButton, TwitterShareButton,SocialShareButton} from 'react-share';
import {EmailIcon,FacebookIcon,TwitterIcon} from 'react-share';
function Example() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>News title Here</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        </Modal.Body>
        <div className="share-card-main-style">Share via</div>
        <div className="share-card-main-style">
                    <FacebookShareButton className="m-2"
                    hashtag="#CSCI_571_NewsApp">
                        <FacebookIcon size={32} round={true} />
                    </FacebookShareButton>

                    <TwitterShareButton className="m-2"
                    hashtag="#CSCI_571_NewsApp">
                        <TwitterIcon size={32} round={true} />
                    </TwitterShareButton>

                    <EmailShareButton className="m-2"
                    hashtag="#CSCI_571_NewsApp">
                        <EmailIcon size={32} round={true} />
                    </EmailShareButton>
                </div>
        
      </Modal>
    </div>
  );
}

export default Example;