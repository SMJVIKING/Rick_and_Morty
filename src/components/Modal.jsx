import { XCircleIcon } from "@heroicons/react/24/outline";

function Modal({open, onOpen, title,children }) {
  if (!open) return null;
  return (
    <div>
      <div className="backdrop" onClick={() => onOpen(false)}></div>
      <div className="modal">
        <div className="modal__header">
          <h2 className="title">{title}</h2>
          <button onClick={() => onOpen(false)}>
            <XCircleIcon className="icon close" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;



// مودال ی بخش بک دراپ داره ک ی صفحه سیاه هست و
//  کل صفحه سایت رو پر میکنه و بعد ی صفحه هدر و بادی مجزا هم روش میندازیم