import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getOneNews } from "../../actions/newsActions";
import { EditorWrapper } from "../../components/editor";
import { Wrapper } from "../../components/layout";
export const EditorEditPage = () => {
  const [searchParams] = useSearchParams();
  const [editPostData, setEditPostData] = useState({});
  const editId = searchParams.get("edit");
  useEffect(() => {
    (async () => {
      if (editId) {
        const data = await getOneNews(editId);
        setEditPostData(data);
      }
    })();
  }, [editId]);

  return (
    <Wrapper>
      {Object.keys(editPostData).length && (
        <EditorWrapper content={editPostData} edit />
      )}
    </Wrapper>
  );
};
