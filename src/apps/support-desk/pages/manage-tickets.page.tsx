import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { VLoader } from '@components/molecules';
import { useGetSupportDocByTitleQuery } from 'store/slices/support-doc.slice';
import { useNavlinkContext } from '../../../context/navlinkContext';

function ManageTicketsPage() {
  // Context and Routing
  const { setSubLinks } = useNavlinkContext();
  const { title, subTitle } = useParams();

  // Derived State
  const documentTitle = subTitle || title;
  const {
    data: supportDocList,
    error,
    isFetching,
    refetch,
  } = useGetSupportDocByTitleQuery(documentTitle || '', {
    refetchOnMountOrArgChange: true,
  });

  const currentDoc = useMemo(() => {
    // Clear doc if there's a 404 error or empty array
    if (error && 'status' in error && error.status === 404) {
      return undefined;
    }
    return supportDocList?.[0];
  }, [supportDocList, error]);

  // Effects
  useEffect(() => {
    if (documentTitle) refetch();
  }, [documentTitle, refetch]);

  useEffect(() => {
    if (!currentDoc) {
      return;
    }

    // const sublinks = currentDoc.link ? currentDoc.link.split(',').map((s) => s.trim()) : [];

    // setSubLinks(sublinks);
  }, [currentDoc, setSubLinks]);

  // Loading State (with artificial delay for smooth UX)
  const isLoading = isFetching || !documentTitle;

  // Render States
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <VLoader />
      </div>
    );
  }


  return (
    <article className="support-doc-container ">
    </article>
  );
}

export default ManageTicketsPage;
