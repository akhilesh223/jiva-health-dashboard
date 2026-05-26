import { DataTable } from './reusable/DataTable';
import { userColumns } from './columns/userColumns';
import { useUserStore } from '../../store/userStore';

export function UserTable() {
  const { users } = useUserStore();

  return (
    <DataTable columns={userColumns} data={users} searchKey="name" />
  );
}
