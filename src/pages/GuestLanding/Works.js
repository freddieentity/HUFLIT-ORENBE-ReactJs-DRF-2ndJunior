import React from "react";

import { Button, Modal } from "antd";

class Works extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div id="works" className="block worksBlock">
        <div className="container-fluid">
          <div className="titleHolder">
            <h2>The Most Exquisite European Hotel</h2>
            <p>The Ritz-Carlton | Art of the Craft</p>
          </div>
          <div className="contentHolder">
            <Button size="large" onClick={this.showModal}>
              <i className="fas fa-play"></i>
            </Button>
          </div>
          <Modal
            title="The Ritz-Carlton |  Art of the Craft"
            visible={this.state.visible}
            onCancel={this.handleCancel}
            footer={null}
            destroyOnClose={true}
          >
            <iframe
              title="Woocommerce Tutorial"
              width="100%"
              height="350"
              src="https://youtu.be/tOaVHjszNpI"
            ></iframe>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Works;
