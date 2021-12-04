import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as BsIcons from 'react-icons/bs'
import { api, microservicesUri } from '../../../config/axiosConfig';
import ErrorMessage from '../../common/ErrorMessage/ErrorMessage';
import Spinner from '../../common/Spinner/Spinner';
import { HttpRequestOnActionHandler } from '../../../config/httpHandlers';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { BottomTableButton } from '../../common/Buttons/BottomTableButton';