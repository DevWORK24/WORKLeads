import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationComponent(props) {  
  return (
    <Stack spacing={2}>      
      <Pagination count={props.totalCount} color='primary'  variant="outlined" shape="rounded" onChange={(e,pageNum)=>props.onPageChange(pageNum)} />
    </Stack>
  );
}