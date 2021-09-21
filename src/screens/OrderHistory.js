import { makeStyles } from "@material-ui/core"
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrderMine } from '../actions/orderActions';
import { DataGrid } from '@material-ui/data-grid';
const useStyles = makeStyles((theme)=> ({

}))
const columns = [
{field: 'id', headerName: "ID", width: 130},
{field: 'date', headerName: 'DATE', width: 130},
{field: 'total', headerName: "TOTAL", width: 70},
{field: 'paid', headerName: "PAID", width: 70},
{field: 'deliverd', headerName: "DELIVERED", width: 70},
{field: 'actions', headerName: "ACTIONS", width: 130},
]

function OrderHistory(){
const classes= useStyles()
const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);
return(
<div style={{ height: 400, width: '100%' }}>
{loading? (
  <div>Loading.,...</div>
): error ? (
  <div>{error}</div>
): (
<DataGrid columns={columns} />
)}

  </div>
)
}

export default OrderHistory