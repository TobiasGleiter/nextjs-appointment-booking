import SellerEditor from '@/src/components/form/sellers-dashboard-form';
import { readSellerById } from '@/src/lib/database/collection/seller/read-seller';
import { Locale } from '@/src/lib/lang/i18.config';
import { getDictionary } from '@/src/lib/lang/lang';

export default async function SellerEditorPage({
  params: { lang, sellerId },
}: {
  params: { lang: Locale; sellerId: string };
}) {
  const { button } = await getDictionary(lang);

  const seller = await readSellerById(sellerId);

  return <SellerEditor seller={seller} button={button} lang={lang} />;
}
