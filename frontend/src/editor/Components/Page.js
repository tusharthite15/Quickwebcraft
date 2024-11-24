import { useToggle } from "../../config";
import "../index.css";
import React, { useEffect } from "react";
import { IoAddOutline } from "react-icons/io5";
function Page() {
  const { pages, setpages, GJinitRef, Menu } = useToggle();

  useEffect(() => {
    if (GJinitRef.current) {
      const pages = GJinitRef.current.Pages;
      setpages(pages.getAll());
    }
  }, [Menu, GJinitRef, setpages]);

  const addNewPage = () => {
    if (GJinitRef.current) {
      const pages = GJinitRef.current.Pages;
      const newPageId = `page-${pages.getAll().length + 1}`; // Unique page ID
      pages.add({
        id: newPageId,
        styles: `.my-new-page-el { color: green; margin:10px }`,
        component: `<div class="my-new-page-el">New Page</div>`,
      });

      // Add new page to state and set as active
      setpages(pages.getAll());

      // Select the newly added page
      pages.select(newPageId);
    }
  };

  const selectPage = (newPageId) => {
    if (GJinitRef.current) {
      const pages = GJinitRef.current.Pages;
      pages.select(newPageId);
    }
  };

  return (
    <div className="Page">
      <div className="page-header">
        <button
          onClick={addNewPage}
        >
          <IoAddOutline size={20} />
          <span>Add Page</span>
        </button>
      </div>

      <div className="page-content">
        <div className="page-grid">
          {pages.map((page) => (
            <div key={page.id} className="page-preview" onClick={() => selectPage(page.id)}>
              <div className="preview-content">
                {/* Render content based on the passed props */}
                <div className="preview-text">{page.component}</div>
                <div className="preview-id">
                  {page.id}
                </div>
              </div>
            </div>

          ))}
        </div>
      </div>
    </div>
  );
}
export default Page;
