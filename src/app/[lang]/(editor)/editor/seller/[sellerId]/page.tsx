import { readSellerById } from '@/src/lib/database/collection/seller/read-seller';
import { Locale } from '@/src/lib/lang/i18.config';

export default async function SellerEditorPage({
  params: { lang, sellerId },
}: {
  params: { lang: Locale; sellerId: string };
}) {
  const seller = await readSellerById(sellerId);
  console.log(seller);

  return <div>SellerEditorPage</div>;
}
