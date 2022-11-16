import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';


const axios = require('axios');

jest.mock('axios')
// axios.get.mockResolvedValue({ data: { message: [] } })

global.React = React