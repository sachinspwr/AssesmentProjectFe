import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { VLoader } from '@components/molecules';
import { useGetSupportDocByTitleQuery } from 'store/slices/support-doc.slice';
import MarkdownRenderer from '@components/organisms/markdown/markdown-renderer';
import { DocumentNotFound } from '../components';
import { useNavlinkContext } from '@context/navlinkContext';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';

function DocsHomePage() {
  // Context and Routing
  const { setMainLinks } = useNavlinkContext();
  const { title, subTitle } = useParams();
  const [prevMainLinks, setPrevMainLinks] = useState<SidebarItem[]>([]);

  // Derived State
  const documentTitle = subTitle || title;
  const {
    data: documents = [],
    error,
    isFetching,
    refetch,
  } = useGetSupportDocByTitleQuery(documentTitle || '', {
    refetchOnMountOrArgChange: true,
  });

  const currentDoc = useMemo(() => {
    if (error && 'status' in error && error.status === 404) {
      return undefined;
    }

    return documents?.[0];
  }, [documents, error]);

  useEffect(() => {
    const mainLinks = documents.map((x) => {
      const subLinks = x.subDocs.map((sd) => ({
        label: sd.title,
        path: `/help-center/docs/${x.slug}/${sd.slug}`,
        icon: IoDocumentTextOutline,
      }));
      return { label: x.title, path: `/help-center/docs/${x.slug}`, icon: HiOutlineClipboardDocumentList, subLinks };
    });

    // Only update if the mainLinks have changed
    if (JSON.stringify(mainLinks) !== JSON.stringify(prevMainLinks)) {
      console.log(mainLinks);
      setMainLinks(mainLinks);
      setPrevMainLinks(mainLinks); // Update previous links
    }
  }, [documents, prevMainLinks, setMainLinks]);

  // Effects
  useEffect(() => {
    if (documentTitle) refetch();
  }, [documentTitle, refetch]);

  // Render States
  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-full">
        <VLoader />
      </div>
    );
  }

  if (!currentDoc) {
    return (
      <div
        className=" flex justify-center items-center"
        style={{
          minHeight: 'calc(100vh - 200px)', // Subtracts header height
        }}
      >
        <DocumentNotFound />
      </div>
    );
  }

  return (
    <article className="support-doc-container">
      <MarkdownRenderer markdownText={currentDoc.content} />
    </article>
  );
}

export default DocsHomePage;
