import AdminLayout from '../admin-layout';

export default function FoodLogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}
