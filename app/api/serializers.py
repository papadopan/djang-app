from rest_framework import serializers

from api.models import Literature


class LiteratureSerializer(serializers.Serializer):

    title = serializers.CharField()
    abstract = serializers.CharField()
    publication_date = serializers.DateTimeField(read_only=True)

    class Meta:
        fields = (
            "title",
            "abstract",
            "publication_date",
        )

class LiteratureInspireSerializer(serializers.Serializer):
    title = serializers.CharField()
    abstract = serializers.CharField()
    arxiv_id = serializers.CharField()
    publication_date = serializers.DateTimeField()

    class Meta:
        fields = (
            "title",
            "abstract",
            "arxiv_id",
            "publication_date",
        )

    def create(self, validated_data):
        """Create and return a new Literature instance."""
        return Literature.objects.create(**validated_data)
