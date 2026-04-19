export default function Modal({
  ModalBody,
  ModalFooter,
  onClose,
}: {
  ModalBody: React.ReactNode;
  ModalFooter?: React.ReactNode;
  onClose: () => void;
}) {

  return (
    <>
      <div className="w-[100svw] absolute h-[100svh] top-0 left-0 bg-black/20 pt-14 backdrop-blur-md">
        <div className="m-auto  justify-left place-center px-4 py-4 container max-w-[40svw] ">
          <div className="modal-head flex w-full flex-row">
            <div className="flex-1">
              <h3 className="font-bold ">Create new message</h3>
            </div>
            <div className="ml-auto" onClick={onClose}>
              <button className="btn btn-ghost rounded-full w-8 h-8 flex items-center justify-center">
                x
              </button>
            </div>
          </div>
          <div className="modal-content">{ModalBody}</div>
          <div className="modal-footer">{ModalFooter}</div>
        </div>
      </div>
    </>
  );
}
