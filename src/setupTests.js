import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';


import axios from 'axios';
jest.mock('axios')
axios.get.mockResolvedValue({ data: { message: [] } })

global.React = React