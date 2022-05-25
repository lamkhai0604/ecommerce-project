import { createTheme } from '@mui/material/styles';


export const theme = createTheme({
    palette: {
      neutral: {
        main: '#64748B',
        contrastText: '#fff',
      },
    },
  });

declare module '@mui/material/styles' {
    interface Palette {
      neutral: Palette['primary'];
    }
  
    // allow configuration using `createTheme`
    interface PaletteOptions {
      neutral?: PaletteOptions['primary'];
    }
  }
  
  // Update the Button's color prop options
  declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
      neutral: true;
    }
  }
  