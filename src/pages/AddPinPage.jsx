import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { usePinContext } from "../contexts/PinContext";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

export default function AddFoodPage() {
  const navigate = useNavigate();
  const { addPin } = usePinContext();
  const [formValue, setFormValue] = React.useState({
    title: "",
    image: "",
    category: "",
    size: "",
  });

  function handleChange(e) {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !formValue.title.trim() ||
      !formValue.image.trim() ||
      !formValue.category ||
      !formValue.size
    ) {
      return;
    }

    addPin(formValue);

    setFormValue({
      title: "",
      image: "",
      category: "",
      size: "",
    });
    //navigate(-1);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Create New Pin
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="Title"
              name="title"
              autoFocus
              value={formValue.title}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="image"
              label="Image"
              value={formValue.image}
              onChange={handleChange}
            />
            <FormControl fullWidth>
              <InputLabel>Size</InputLabel>
              <Select
                value={formValue.size}
                onChange={handleChange}
                label="Size"
                name="size"
              >
                <MenuItem value={"small"}>Small</MenuItem>
                <MenuItem value={"medium"}>Medium</MenuItem>
                <MenuItem value={"large"}>Large</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mt: 1 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={formValue.category}
                onChange={handleChange}
                label="Category"
                name="category"
              >
                <MenuItem value={"car"}>Cars</MenuItem>
                <MenuItem value={"animal"}>Animal</MenuItem>
                <MenuItem value={"anime"}>Anime</MenuItem>
                <MenuItem value={"videogame"}>VideoGames</MenuItem>
                <MenuItem value={"art"}>art</MenuItem>
              </Select>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="error"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Pin
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
