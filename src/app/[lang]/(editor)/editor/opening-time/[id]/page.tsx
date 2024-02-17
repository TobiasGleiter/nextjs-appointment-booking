import { AdminUpdateOpeningTimeEditorForm } from '@/src/components/form/admin-opening-time-editor-form';
import { readOpeningTimeById } from '@/src/lib/database/collection/opening-time/read-opening-time';
import { Locale } from '@/src/lib/lang/i18.config';
import { getDictionary } from '@/src/lib/lang/lang';

export default async function OpeningTimeEditorPage({
  params: { lang, id },
}: {
  params: { lang: Locale; id: string };
}) {
  const { button } = await getDictionary(lang);
  const openingTime = await readOpeningTimeById(id);
  console.log(openingTime);

  return (
    <AdminUpdateOpeningTimeEditorForm
      button={button}
      openingTime={openingTime}
    />
  );
}
