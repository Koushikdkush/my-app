import React from "react";
export const ModalComponent = React.memo(({ setOpenModal, children }) => {

  console.log('Modal Renderd');

  return (
    <>
      {/* Backdrop */}
      <div className="modal-backdrop fade show" onClick={(e) => e.stopPropagation()}></div>

      {/* Modal */}
      <div
        className="modal fade show d-block"
        onClick={(e) => e.stopPropagation()}      >
        <div
          className="modal-dialog modal-dialog-centered"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content">

            <div className="modal-header">
              <h5>Remove Product</h5>
            </div>

            <div className="modal-body">
              {children}
            </div>

            <div className="modal-footer border border-0">
              <button className="btn btn-danger"> Remove</button>
              <button className="btn btn-primary" onClick={() => setOpenModal(false)}> Close</button>

            </div>
          </div>
        </div>
      </div>
    </>
  );
});