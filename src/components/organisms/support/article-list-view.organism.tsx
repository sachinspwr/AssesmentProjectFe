import { VTypography } from "@components/molecules/typography/v-typography.mol";
import { ArticleResponseDTO } from "@dto/response/article.response.dto";

type Props = {
    articles: ArticleResponseDTO[];
    isLoading?: boolean;
    onSelect: (article: ArticleResponseDTO) => void;
    selectedId?: string;
};

export function ArticlesList({ articles, isLoading, onSelect, selectedId }: Props) {
    if (isLoading) return <div>Loading articles...</div>;

    if (!articles.length) {
        return <div className="text-center py-10 text-gray-500">No articles found.</div>;
    }

    return (
        <div className="flex flex-col gap-2 overflow-y-auto max-h-[65vh] pr-2">
            {articles.map((article) => (
                <div
                    key={article.id}
                    onClick={() => onSelect(article)}
                    className={`cursor-pointer p-3 border-b-2 hover:bg-skin-theme-light ${selectedId === article.id ? 'bg-theme-light border-theme-primary' : ''
                        }`}
                >
                    <VTypography as="h5">{article.title}</VTypography>
                </div>
            ))}
        </div>
    );
}
