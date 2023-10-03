import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteNews, getNews } from "../../actions/newsActions";
import { EditorWrapper } from "../../components/editor";
import { Wrapper } from "../../components/layout";
import { useLocalStorage } from "../../hooks/useLocalStorage";
export const MyNewsPage = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [userId] = useLocalStorage("userId");
  const hundleDelete = async (e, el) => {
    const { data } = await deleteNews(el._id, navigate);
  };
  useEffect(() => {
    (async () => {
      const { data } = await getNews("/news/getAll", {
        user: userId,
      });
      setNews(data);
    })();
  }, []);
  return (
    <Wrapper>
      <Button onClick={() => navigate('/editor')}>New News</Button>
      {news.map((el, i) => (
        <>
          <EditorWrapper preview content={el.rawText}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <Button onClick={() => navigate(`/editor-edit?edit=${el._id}`)}>
                Edit
              </Button>
              <Button onClick={(e) => hundleDelete(e, el)}>Delete</Button>
              <Typography component="p" variant="p">
                {!el.publish ? "Не опубликован" : "Опубликован"}
              </Typography>
              {!el.publish && (
                <Typography component="p" variant="p">
                  Опубликуется: {new Date(el.publicTime).toUTCString()}
                </Typography>
              )}
            </Box>
          </EditorWrapper>
        </>
      ))}
    </Wrapper>
  );
};
